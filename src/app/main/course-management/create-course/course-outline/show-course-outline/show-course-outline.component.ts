import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CourseManagementService } from 'app/main/course-management/course-management.service';
import { ActivatedRoute } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-show-course-outline',
  templateUrl: './show-course-outline.component.html',
  styleUrls: ['./show-course-outline.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ShowCourseOutlineComponent implements OnInit {

  constructor( 
      private courseService: CourseManagementService,
      private route: ActivatedRoute  
    ) { }

  ngOnInit(): void {

    const courseId = this.route.snapshot.params['courseId'];
    console.log(courseId);

    this.courseService.getOutlineByCourse(courseId).subscribe((outlineRes: any) => {
        console.log(outlineRes);

    });
  }

}
