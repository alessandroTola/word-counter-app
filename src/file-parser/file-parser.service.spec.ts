import { Test, TestingModule } from '@nestjs/testing';
import { FileParserService } from './file-parser.service';
import { promises as fs } from 'fs';
import axios from 'axios';

jest.mock('fs', () => ({
  promises: {
    readFile: jest.fn(),
  },
}));
jest.mock('axios');

describe('FileParserService', () => {
  let service: FileParserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileParserService],
    }).compile();

    service = module.get<FileParserService>(FileParserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should correctly analyze a file from a URL', async () => {
    const mockContent = `Aeque enim contingit omnibus fidibus, ut incontentae sint.
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae cum ita sint, effectum est nihil esse malum, quod turpe non sit. Itaque nostrum est-quod nostrum dico, artis est-ad ea principia, quae accepimus. Quod totum contra est. Duo Reges: constructio interrete. Atqui iste locus est, Piso, tibi etiam atque etiam confirmandus, inquam; Quamvis enim depravatae non sint, pravae tamen esse possunt. Duarum enim vitarum nobis erunt instituta capienda.

Non igitur de improbo, sed de callido improbo quaerimus, qualis Q. Audio equidem philosophi vocem, Epicure, sed quid tibi dicendum sit oblitus es. Ex ea difficultate illae fallaciloquae, ut ait Accius, malitiae natae sunt. At multis malis affectus. Nam quibus rebus efficiuntur voluptates, eae non sunt in potestate sapientis. Quis est tam dissimile homini. Ut proverbia non nulla veriora sint quam vestra dogmata. Si quicquam extra virtutem habeatur in bonis. Sed plane dicit quod intellegit. Paulum, cum regem Persem captum adduceret, eodem flumine invectio?

Qui ita affectus, beatum esse numquam probabis; Sed nimis multa. Nam prius a se poterit quisque discedere quam appetitum earum rerum, quae sibi conducant, amittere. Familiares nostros, credo, Sironem dicis et Philodemum, cum optimos viros, tum homines doctissimos. Quod iam a me expectare noli. Quid ergo?

Eademne, quae restincta siti? Ita relinquet duas, de quibus etiam atque etiam consideret. Illa videamus, quae a te de amicitia dicta sunt. Eaedem res maneant alio modo. Quid ergo attinet gloriose loqui, nisi constanter loquare? Prioris generis est docilitas, memoria; Portenta haec esse dicit, neque ea ratione ullo modo posse vivi; Beatum, inquit. Bestiarum vero nullum iudicium puto.

Quem Tiberina descensio festo illo die tanto gaudio affecit, quanto L. Quorum sine causa fieri nihil putandum est. Tria genera bonorum; Nunc dicam de voluptate, nihil scilicet novi, ea tamen, quae te ipsum probaturum esse confidam. Illud dico, ea, quae dicat, praeclare inter se cohaerere. Fortemne possumus dicere eundem illum Torquatum? Hoc tu nunc in illo probas. Cur post Tarentum ad Archytam?

Indicant pueri, in quibus ut in speculis natura cernitur.
Sed tamen est aliquid, quod nobis non liceat, liceat illis. Virtutis, magnitudinis animi, patientiae, fortitudinis fomentis dolor mitigari solet. Piso igitur hoc modo, vir optimus tuique, ut scis, amantissimus. Non prorsus, inquit, omnisque, qui sine dolore sint, in voluptate, et ea quidem summa, esse dico. Potius inflammat, ut coercendi magis quam dedocendi esse videantur. Virtutis, magnitudinis animi, patientiae, fortitudinis fomentis dolor mitigari solet. Quae fere omnia appellantur uno ingenii nomine, easque virtutes qui habent, ingeniosi vocantur. Nec enim, dum metuit, iustus est, et certe, si metuere destiterit, non erit;`;

    (axios.get as jest.Mock).mockResolvedValue({ data: mockContent });

    const result = await service.parseFile('https://filesamples.com/samples/document/txt/sample2.txt');

    expect(result.wordsCount).toBe(423);
    expect(result.lettersCount).toBe(2312); // Excluding punctuation
    expect(result.spacesCount).toBe(423);
    expect(result.wordsCountGreater).toEqual({});
  });

  it('should correctly analyze a local file', async () => {
    const mockContent = 'Hello World';
    (fs.readFile as jest.Mock).mockResolvedValue(mockContent);

    const result = await service.parseFile('test/localfile/test1.txt');

    expect(result.wordsCount).toBe(2);
    expect(result.lettersCount).toBe(10); // Excluding punctuation
    expect(result.spacesCount).toBe(2);
    expect(result.wordsCountGreater).toEqual({});
  });

  it('should handle empty content correctly', async () => {
    const mockContent = '';
    (fs.readFile as jest.Mock).mockResolvedValue(mockContent);

    const result = await service.parseFile('test/localfile/test_empty_file.txt');

    expect(result.wordsCount).toBe(0);
    expect(result.lettersCount).toBe(0); // Excluding punctuation
    expect(result.spacesCount).toBe(0);
    expect(result.wordsCountGreater).toEqual({});
  });

  it('should correctly identify repeated words', async () => {
    const mockContent = 'test test test test test test test test test test test test test test';
    (fs.readFile as jest.Mock).mockResolvedValue(mockContent);

    const result = await service.parseFile('test/localfile/test_repeted_word.txt');

    expect(result.wordsCountGreater).toEqual({ test: 14 });
  });

  it('should throw an error when reading a local file fails', async () => {
    (fs.readFile as jest.Mock).mockRejectedValue(new Error('Error reading file from local path'));

    await expect(service.parseFile('/path/to/local/file.txt'))
      .rejects
      .toThrow('Error reading file from local path');
  });

  it('should throw an error when fetching file from URL fails', async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error('Request failed with status code 404'));

    await expect(service.parseFile('http://example.com/file.txt'))
      .rejects
      .toThrow('Error fetching file from URL');
  });
});
