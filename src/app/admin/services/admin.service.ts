import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class AdminService {
    constructor(private http: HttpClient) { }

    createFlightDetail(param: any): Promise<any> {
        return this.http
            .post(`${environment.API_URL}/flightDetail/create`, param)
            .toPromise();
    }
}