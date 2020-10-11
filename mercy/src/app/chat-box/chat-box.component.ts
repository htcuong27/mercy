import { Component, Input, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { element } from 'protractor';

const SOCKET_ENDPOINT = 'localhost:3000';
@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss'],
})
export class ChatBoxComponent implements OnInit {
  @Input() message: string;
  socket: any;
  constructor() {}

  ngOnInit(): void {
    this.setUpSocketConnection();
  }

  setUpSocketConnection(): void {
    this.socket = io(SOCKET_ENDPOINT);
    this.socket.on('connect', () => {
      this.socket.emit('addUser', this.message );
    });
    this.socket.on('notification', (userName, data) => {
      const conversation = document.getElementById('conversation');
      const newUser = document.createElement('div');
      newUser.innerText = userName + ':' + data;
      conversation.appendChild(newUser);
    });
    this.socket.on('getListUser', (data) => {
      const users = document.getElementById('users');
      if (users) {
        users.remove();
      }
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          const user = document.createElement('div');
          user.innerText = data[key];
          users.appendChild(user);
        }
      }
    });
    this.socket.on('message-broadcast', (data: string): void => {
      console.log('data', data);
      if (data) {
        this.createContentMsg(data, true);
      }
    });
  }

  createContentMsg(msg: string, isSent: boolean): void {
    const ele: HTMLLIElement = document.createElement('li');
    ele.innerHTML = msg;
    ele.style.background = 'white';
    ele.style.padding = '15px auto';
    ele.style.margin = '10px';
    ele.style.textAlign = !isSent ? 'left' : 'right';
    document.getElementById('conversation').appendChild(ele);
  }

  onClick(): void {
    this.socket.emit('message', this.message);
    this.createContentMsg(this.message, false);
    this.message = '';
  }

  onEnter(): void {
    this.onClick();
  }
}
