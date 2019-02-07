import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WikiParserService {

  constructor() { }

  private searchKeys = [
    'parents',
    'spouse',
    'children'
  ]

  results = [];

  parseWikiText(data) {
    this.results = []
    let unparsedPage = data;

    this.searchKeys.forEach(key => {

      let curkey = new RegExp(`${key}(.*?)\n`, 'g');

      const regex = /\[\[(?!.+?:)(.+?)\|(.+?)\]\]/g;

      const categoryMatches = unparsedPage.match(curkey);
      console.log(categoryMatches)
      let m;


      while ((m = regex.exec(categoryMatches)) !== null) {

          // This is necessary to avoid infinite loops with zero-width matches
          if (m.index === regex.lastIndex) {
              regex.lastIndex++;
          }
          
          // The result can be accessed through the `m`-variable.
          m.forEach((match, groupIndex) => {
            groupIndex == 1 ? this.results.push(match) : false;
          });
      }
    })

    return this.results;
  }
}
