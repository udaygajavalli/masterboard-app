import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { YoutubeService } from 'src/app/services/youtube.service';

@Component({
  selector: 'app-request-course',
  templateUrl: './request-course.component.html',
  styleUrls: ['./request-course.component.scss'],
})
export class RequestCourseComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private youtube: YoutubeService
  ) {}

  ngOnInit(): void {}
  courseUrl!: string;
  id!: string;

  onSubmit(f: NgForm) {
    this.courseUrl = f.value;
    this.courseUrl = JSON.stringify(this.courseUrl);
    // console.log(this.courseUrl);

    console.log(f.valid);
    this.courseUrl = this.courseUrl.trim();
    if (
      this.courseUrl.includes('youtube.com') ||
      this.courseUrl.includes('youtu.be')
    ) {
      if (this.courseUrl.includes('playlist?list=')) {
        let regex = /(?<=playlist\?list=)(.*?)(?=(?:\?|$))/g;
        this.id = this.courseUrl.match(regex)![0];
        this.youtube.getPlaylistItems(this.id).subscribe((data) => {
          console.log(data);
        });
        this.toastr.success('Added!');
      }
    } else {
      this.toastr.error('As of now we only support YouTube Playlists.');
    }
  }
  // res: any;

  // getPlaylist(id: string) {
  //   this.res = this.http.get(
  //     `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=25&playlistId=${id.slice(
  //       0,
  //       -2
  //     )}f&key=${environment.googleAPI_KEY}`
  //   );
  //   console.log(`Heyyy. ${this.res}`);
  // }
}