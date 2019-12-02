import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Issue} from '../models/issue';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class DataService {
  private readonly API_URL = 'http://localhost:8081/userendpoint/getPassengers';
  private readonly SAVE_URL = 'http://localhost:8081/userendpoint/addPassenger';
  private readonly DEL_URL = 'http://localhost:8081/userendpoint/deletePassenger/';
  private readonly UPD_URL = 'http://localhost:8081/userendpoint/updatePassenger/';

  dataChange: BehaviorSubject<Issue[]> = new BehaviorSubject<Issue[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor (private httpClient: HttpClient) {}

  get data(): Issue[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllIssues(): void {
    this.httpClient.get<Issue[]>(this.API_URL).subscribe(data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
      });
  }

  addIssue (passenger: Issue): void {
    this.dialogData = passenger;
    this.httpClient.post(this.SAVE_URL, passenger).subscribe(data => {
      this.dialogData = passenger;
      },
      (err: HttpErrorResponse) => {
        console.log('error in adding passenger record');
    });
  }

  deleteIssue (id: number): void {
      this.httpClient.delete(this.DEL_URL + id).subscribe(data => {
        console.log(data);
        },
        (err: HttpErrorResponse) => {
          console.log('error in deleting passenger');
        }
      );
  }

  updateItem(passenger: Issue): void {
    this.dialogData = passenger;
    this.httpClient.put(this.UPD_URL + passenger.passengerid, passenger).subscribe(data => {
        this.dialogData = passenger;
      },
      (err: HttpErrorResponse) => {
        console.log('error in updating passenger');
      }
    );
  }

}
