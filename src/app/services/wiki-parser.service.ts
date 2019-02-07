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
    let unparsedPage = data.replace(/\n\*/g, '');
    
    this.searchKeys.forEach(key => {

      let category = new RegExp(`${key}(.*?)\n`, 'g');

      const regex = /\[\[([^\]\[:]+)\|([^\]\[:]+)\]\]/g;

      const categoryMatches = unparsedPage.match(category);

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
