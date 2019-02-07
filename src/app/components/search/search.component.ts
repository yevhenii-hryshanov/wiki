import { Component, OnInit, ɵConsole } from '@angular/core';
import { WikipediaService } from 'src/app/services/wikipedia.service';
import { RelativeInjectorLocationFlags } from '@angular/core/src/render3/interfaces/injector';
import { TitleService } from 'src/app/services/title.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {


  ngOnInit() {
  }


  wikiLink:string = '';

  articleTitle = ''

  relatives;

  constructor(private wikipedia: WikipediaService,
              private titleService: TitleService) { }

  onSubmit() {
    this.relatives = [];

    this.currentTitle(this.wikiLink);

    this.getArticle(this.articleTitle)


  }

  currentTitle(url) {
    this.articleTitle = url.split('/').pop();

    this.titleService.changeTitle(this.articleTitle)
  }

  getArticle(title) {
    this.wikipedia.getArticle(title).subscribe((data) => {
      this.relatives = data;
    })
  }
}
