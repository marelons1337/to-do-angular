import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Task } from '../Task';
import { UiService } from '../services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();
  name: string = '';
  date: string = '';
  reminder: boolean = false;
  showAddTask: boolean = false;
  subscription!: Subscription;

  constructor(private uiService: UiService) {
    this.subscription = this.uiService.onToggle().subscribe((value) => {
      this.showAddTask = value;
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (!this.name) {
      alert('Missing text in your task');
    }

    const newTask = {
      name: this.name,
      date: this.date,
      reminder: this.reminder,
    };

    this.onAddTask.emit(newTask);

    this.name = '';
    this.date = '';
    this.reminder = false;
  }
}
