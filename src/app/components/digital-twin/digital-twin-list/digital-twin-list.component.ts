import { Component, OnInit } from '@angular/core';
import { DigitalTwin } from '../../../models/digital-twin';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../../services/Project/project.service';

@Component({
  selector: 'app-digital-twin-list',
  templateUrl: './digital-twin-list.component.html',
  styleUrls: ['./digital-twin-list.component.css']
})
export class DigitalTwinListComponent implements OnInit {
  projectId: number;
  digitalTwins: DigitalTwin[];

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.projectId = Number(params.get('projectId'));
      this.loadDigitalTwins();
    });
  }

  loadDigitalTwins() {
    this.projectService
      .getDigitalTwinsByProjectId(this.projectId)
      .subscribe(digitalTwins => {
        this.digitalTwins = digitalTwins;
      });
  }
}
