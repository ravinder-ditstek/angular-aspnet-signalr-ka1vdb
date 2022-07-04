import { Injectable } from '@angular/core';
import {
  HubConnectionBuilder,
  LogLevel,
  HttpTransportType,
} from '@microsoft/signalr';

//import { MessagePackHubProtocol } from "@aspnet/signalr-protocol-msgpack";

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private hubConnection: signalR.HubConnection;

  public startConnection = () => {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('https://dev-api.onedealerlane.com/deals/hubs/deals/views', {
        accessTokenFactory: () => {
          return this.generateAccessToken('123');
        },
      })
      /*  {
          skipNegotiation: true,
          transport: HttpTransportType.WebSockets
        }*/

      .configureLogging(LogLevel.Information)
      .build();

    this.hubConnection.on('DealUpdated', (Msg) => {
      console.log(Msg);
    });

    this.hubConnection
      .start()
      .then(() => this.hubConnection.invoke('Subscribe', 5))
      .then(() => console.log('Connection started'))
      .catch((err) => console.log('Error while starting connection: ' + err));
    console.log(this.hubConnection);
  };
  public generateAccessToken(userName) {
    return 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6InZvNFFhZDdyMS12OFlodzRjYmxmQm5JWjI3YTJCSDRwZy1hWksyczJVXzAifQ.eyJpc3MiOiJodHRwczovL29kbGRldi5iMmNsb2dpbi5jb20vMTc2ZDVjMDAtOTI3Zi00NjAxLThhZDYtY2Y0OTE5NTM1YzExL3YyLjAvIiwiZXhwIjoxNjU2OTUyODg2LCJuYmYiOjE2NTY5NDkyODYsImF1ZCI6IjJjZjJiZTllLTViYzQtNGNmOC1hZTFmLWZmNTg3NWY0YmE4NSIsInN1YiI6ImViMzk4NTBmLWJkNDQtNDU4My04ZDQwLWMzN2Q3YmE0YmRlYiIsImVtYWlsIjoidWRpdEB5b3BtYWlsLmNvbSIsIm5hbWUiOiJVZGl0IHdpbnMiLCJnaXZlbl9uYW1lIjoiVWRpdCIsImZhbWlseV9uYW1lIjoid2lucyIsImVtYWlscyI6WyJ1ZGl0QHlvcG1haWwuY29tIl0sImV4dGVuc2lvbl9Vc2VySWQiOjMsImV4dGVuc2lvbl9Nb2JpbGVQaG9uZSI6Iig4OTgpIDQ2My04NDkzIiwiZXh0ZW5zaW9uX09yZ0lkIjo1LCJleHRlbnNpb25fT3JnSWRzIjoiNSwxMSIsImV4dGVuc2lvbl9PcmdOYW1lIjoiQVx1MDAyNkggTW90b3JzIiwiZXh0ZW5zaW9uX09yZ1JvbGUiOiJBZG1pbmlzdHJhdG9yIiwiZXh0ZW5zaW9uX09yZ1Blcm1pc3Npb25zIjoiVmlld1VzZXJzfEFkZFVzZXJ8RWRpdFVzZXJ8RGlzYWJsZVVzZXJ8RGVsZXRlVXNlckludml0ZXxWaWV3TG9jYXRpb25zfEFkZExvY2F0aW9ufEVkaXRMb2NhdGlvbnxEaXNhYmxlTG9jYXRpb258Vmlld0RlYWxzfEFkZERlYWx8RWRpdERlYWx8SW1wb3J0RGVhbHxBcmNoaXZlRGVhbCIsImV4dGVuc2lvbl9PcmdUeXBlIjoiRGVhbGVyIiwiZXh0ZW5zaW9uX0lzTXVsdGlwbGVPcmdzIjp0cnVlLCJleHRlbnNpb25fSXNEaXNhYmxlZCI6ZmFsc2UsInRpZCI6IjE3NmQ1YzAwLTkyN2YtNDYwMS04YWQ2LWNmNDkxOTUzNWMxMSIsImlzRm9yZ290UGFzc3dvcmQiOmZhbHNlLCJub25jZSI6IjY4YmFlYzAyLTE3NzEtNGViZC04OTM4LWZiOGZiMTgxOTU4YSIsInNjcCI6ImRlZmF1bHQiLCJhenAiOiI4MzQzMTM1Ny1jNDA5LTQwYjAtYWVlZi03ZmYzMGYwMzlhOWMiLCJ2ZXIiOiIxLjAiLCJpYXQiOjE2NTY5NDkyODZ9.KRoAHQ8ovWIeRU893YxyLLayynIvTGJ0PY1R0B4XyTmJYnNyqZGwWwJ_5LyG1e2Ix7JNo-2dlqV9Qmhn4CaKTbcB4g0XFcDwxvkxvtmwmj4XpllG8sAsZz6OsuQCDQwinMm1RXY2XrqCVqXPq-9fZTTaFdvBrRs8b4d55OxsWTIwX62KQoinJ59ee_AorlCQ-wUaknCeZATldaUDYBOKSdyPFYYe6MA3g17gG_QdxkjcDodvsKCuqurOK1vNcSLlJ88a5FjY-TIIGFr_VWvGANORwwkUl8Wl4RPeUOSmdpwKftw71bi_6X_I94SE62F3Z8181kQJG3rYcyrnLCbxTw';
  }
  public addTransferChartDataListener = () => {
    this.hubConnection.on('SendToDriver', (Msg) => {
      console.log(Msg);
    });
  };
}
