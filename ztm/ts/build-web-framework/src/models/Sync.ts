import axios, { AxiosResponse } from "axios";
const BaseURL = 'http://localhost:3000'

// TODO: refactor sync class
export class Sync {
  fetch(): void {
    axios.get(`${BaseURL}/users/${this.get('id')}`)
      .then((response: AxiosResponse): void => {
        this.set(response.data)
      })
  }

  save(): void {
    const id = this.get('id')
    if (id) {
      axios.put(`${BaseURL}/users/${id}`, this.data)
    } else {
      axios.post(`${BaseURL}/users`, this.data)
    }
  }

}