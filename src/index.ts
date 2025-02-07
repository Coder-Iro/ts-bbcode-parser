const defaultparser = {
  '\\[br\\]': '<br>',
  '\\[b\\](.+?)\\[/b\\]': '<strong>$1</strong>',
  '\\[i\\](.+?)\\[/i\\]': '<em>$1</em>',
  '\\[u\\](.+?)\\[/u\\]': '<u>$1</u>',
  '\\[h1\\](.+?)\\[/h1\\]': '<h1>$1</h1>',
  '\\[h2\\](.+?)\\[/h2\\]': '<h2>$1</h2>',
  '\\[h3\\](.+?)\\[/h3\\]': '<h3>$1</h3>',
  '\\[h4\\](.+?)\\[/h4\\]': '<h4>$1</h4>',
  '\\[h5\\](.+?)\\[/h5\\]': '<h5>$1</h5>',
  '\\[h6\\](.+?)\\[/h6\\]': '<h6>$1</h6>',
  '\\[p\\](.+?)\\[/p\\]': '<p>$1</p>',
  '\\[color=(.+?)\\](.+?)\\[/color\\]': '<span style="color:$1">$2</span>',
  '\\[size=([0-9]+)\\](.+?)\\[/size\\]':
    '<span style="font-size:$1px">$2</span>',
  '\\[img\\](.+?)\\[/img\\]': '<img src="$1">',
  '\\[img=(.+?)\\]': '<img src="$1">',
  '\\[email\\](.+?)\\[/email\\]': '<a href="mailto:$1">$1</a>',
  '\\[email=(.+?)\\](.+?)\\[/email\\]': '<a href="mailto:$1">$2</a>',
  '\\[url\\](.+?)\\[/url\\]': '<a href="$1">$1</a>',
  '\\[url=(.+?)\\|onclick\\](.+?)\\[/url\\]': '<a onclick="$1">$2</a>',
  '\\[url=(.+?)\\starget=(.+?)\\](.+?)\\[/url\\]':
    '<a href="$1" target="$2">$3</a>',
  '\\[url=(.+?)\\](.+?)\\[/url\\]': '<a href="$1">$2</a>',
  '\\[a=(.+?)\\](.+?)\\[/a\\]': '<a href="$1" name="$1">$2</a>',
  '\\[list\\](.+?)\\[/list\\]': '<ul>$1</ul>',
  '\\[\\*\\](.+?)\\[/\\*\\]': '<li>$1</li>',
};

interface ICode {
  regexp: RegExp;
  replacement: string;
}

type RawCode = Record<string, string>;

export default class BBCode {
  codes: ICode[];

  constructor(codes: RawCode = defaultparser) {
    this.codes = [];

    this.setCodes(codes);
  }

  /**
   * parse
   */
  public parse = (text: string): string => {
    return this.codes.reduce(
      (text, code) => text.replace(code.regexp, code.replacement),
      text
    );
  }

  /**
   * add bb codes
   */
  public add = (regex: string, replacement: string): BBCode => {
    this.codes.push({
      regexp: new RegExp(regex, 'gms'),
      replacement: replacement,
    });

    return this;
  }

  /**
   * set bb codes
   */
  public setCodes = (codes: RawCode): BBCode => {
    this.codes = Object.keys(codes).map(function (regex) {
      const replacement = codes[regex];

      return {
        regexp: new RegExp(regex, 'gms'),
        replacement: replacement,
      };
    }, this);

    return this;
  }
}
