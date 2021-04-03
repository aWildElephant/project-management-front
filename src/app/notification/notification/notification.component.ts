import { Component, OnInit, Input } from '@angular/core';
import { Toast } from 'bootstrap';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.sass']
})
export class NotificationComponent implements OnInit {

  @Input() message?: string
  @Input() description?: string

  ngOnInit() {
    [].slice.call(document.querySelectorAll('.toast')).map(function (toastEl) {
      return new Toast(toastEl, {
        animation: true,
        delay: 30000
      })
    }).forEach(function (toast) {
      toast.show()
    })
  }
}
