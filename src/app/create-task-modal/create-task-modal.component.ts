import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-create-task-modal',
  templateUrl: './create-task-modal.component.html',
  styleUrls: ['./create-task-modal.component.sass']
})
export class CreateTaskModalComponent implements OnInit {

  @Input() active: boolean = false;
  @Output() activeChange = new EventEmitter<boolean>();

  modal?: Modal;

  constructor() {
  }

  ngOnInit() {
    const modalElement = document.getElementById("createTaskModal");

    if (modalElement != null) {
      modalElement.addEventListener("hidden.bs.modal", () => {
        this.activeChange.emit(false)
      })

      this.modal = new Modal(modalElement)
    }
  }

  ngOnChanges() {
    if (this.active) {
      this.modal?.show()
    }
  }
}
