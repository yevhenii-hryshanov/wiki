import { Injectable } from '@angular/core';
import { ComponentFactoryResolver } from '@angular/core/src/render3';

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

    this.results = [];
    let unparsedPage = data.replace(/\n\*/g, '');

    this.searchKeys.forEach(key => {
      
      let currentKey = key;

      if(!unparsedPage.includes(currentKey)) { return }
      
      let relativeReg = new RegExp(`(${currentKey}.*\}\})|(${currentKey}.*[/)])|(${currentKey}.*\]\])`, 'g');

      let relatives = unparsedPage.match(relativeReg);

      console.log(relatives)

      // If no links
      if(!/\[\[.*\]\]/.test(relatives)) {
        return	
      }

      let linksReg = /\[\[(.*?)\]\]/g;

      let persons = relatives.match(linksReg);

      // console.log(persons)

      this.getLinks(persons)
    })

    return this.results
  }

  getLinks(arr) {
    arr.forEach(el => {
      let reg = /\[\[([^)]*)\]\]/.exec(el)[1];
      let link = reg.replace(/\|.*/, '');
      this.results.push(link)
    })
  }

}

// parseWikiText(data) {
//   console.log(data)
//   this.results = []
//   let unparsedPage = data.replace(/\n\*/g, '');
  
//   this.searchKeys.forEach(key => {

//     let category = new RegExp(`${key}(.*?)\n`, 'g');

//     const regex = /\[\[([^\]\[:]+)\|([^\]\[:]+)\]\]/g;

//     const categoryMatches = unparsedPage.match(category);

//     let m;


//     while ((m = regex.exec(categoryMatches)) !== null) {

//         // This is necessary to avoid infinite loops with zero-width matches
//         if (m.index === regex.lastIndex) {
//             regex.lastIndex++;
//         }
        
//         // The result can be accessed through the `m`-variable.
//         m.forEach((match, groupIndex) => {
//           groupIndex == 1 ? this.results.push(match) : false;
//         });
//     }
//   })

//   return this.results;
// }