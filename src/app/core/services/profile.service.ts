import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private username: string;
  private clientid = environment.Client_Id;
  private clientsecret = environment.Client_secret;

  constructor(private http: HttpClient) {
    // Default username for the service
    this.username = 'xahoor72';
  }

  // Update the username for fetching profile data
  updateUsername(username: string) {
    this.username = username;
  }

  // Fetch profile data for the current username
  getUser(): Observable<any> {
    // Set up headers for authorization.
    //  When we authenticate our your rate limits are typically higher
    // than those for unauthenticated requests.
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(`${this.clientid}:${this.clientsecret}`),
    });

    // Fetch profile data from GitHub API
    return this.http.get('https://api.github.com/users/' + this.username, {
      headers: headers,
    });
  }

  // Fetch repositories for the current username with pagination
  getRepositories(pageNumber: any, perPage: any): Observable<any> {
    // Set up headers for authorization
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(`${this.clientid}:${this.clientsecret}`),
    });

    // Fetch repositories from GitHub API with pagination parameters
    return this.http.get(
      `https://api.github.com/users/${this.username}/repos?per_page=${perPage}&page=${pageNumber}`,
      { headers: headers }
    );
  }
}
