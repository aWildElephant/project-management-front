import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-create-task-modal',
  templateUrl: './create-task-modal.component.html',
  styleUrls: ['./create-task-modal.component.sass']
})
export class CreateTaskModalComponent implements OnInit {

  @Input()  active: boolean = false;
  @Output() activeChange = new EventEmitter<boolean>();

  modalElement?: HTMLElement;
  
  constructor() {
  }

  ngOnInit() {
    this.modalElement = document.getElementById("createTaskModal") || undefined;

    this.modalElement?.addEventListener("hidden.bs.modal", () => {
      this.activeChange.emit(false)
    })
  }

  ngOnChanges() {
    if (this.active) {
      if (this.modalElement) {
        console.log("Showing #createTaskModal");
        new Modal(this.modalElement).show();
      }
    }
  }
}
