import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Guid } from 'guid-typescript';
import Swal from 'sweetalert2';
import { ManufacturersService } from '../../../services/manufacturers/manufacturers.service';
import { SwalToast } from '../../../libs/swal';
import { DefaultOptions } from './models/default-options.model';
import { JsonResult } from '../../../models/http/json-result.model';
import { Manufacturer } from '../../../models/manufacturer.model';

@Component({
  selector: 'app-add-manufacturer-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './add-manufacturer-modal.component.html',
  styleUrl: './add-manufacturer-modal.component.css'
})
export class AddManufacturerModalComponent {
  options: DefaultOptions;

  constructor(
    public activeModal: NgbActiveModal,
    private manufacturersService: ManufacturersService
  ) { }

  prepare(options: DefaultOptions) {
    const defaultOptions: DefaultOptions = {
      id: Guid.EMPTY,
      model: {
        name: '',
        crn: '',
        active: true
      },
      callbacks: {
        save: () => {},
        cancel: () => {}
      }
    };
    this.options = { ...defaultOptions, ...options };
  }

  saveManufacturer() {
    var request: Observable<JsonResult<Manufacturer>>;
    var message: string;

    if (this.options.id === Guid.EMPTY) {
      request = this.manufacturersService.add(this.options.model);
      message = 'Manufacturer updated successfully';
    } else {
      request = this.manufacturersService.update(this.options.id, this.options.model);
      message = 'Manufacturer updated successfully';
    }

    request.subscribe({
      next: async () => {
        SwalToast.fire({
          icon: 'success',
          title: message
        });

        this.activeModal.close();
        this.options.callbacks.save();
      },
      error: (response: HttpErrorResponse | Error) => {
        Swal.fire({
          title: 'Request error',
          text: response?.message,
          icon: 'error'
        });
      }
    });
  }
}
