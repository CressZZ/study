# 0. [Client <-> Server] TCP 3-Way Handshake
TCP위에서 동작하는 SSL은 TCP연결이 성립된 상태에서 동작한다. 따라서 SSL Handshake를 진행하기 위해서는 TCP 3-Way Handshake를 통해 TCP연결이 수립되어 있어야 한다. 

# 1. [Client -> Server] Client Hello
- 지원하는 암호와 방법 목록
- Client 난수

# 2. [Client <- Server] Server Hello
- 선택한 암호화 방법
- Server 난수
- Server Certificat (서버 인증서)

서버에서 수신받은 Certificate를 CA(공인인증 기관)의 Publick Key롤 복호화 한다. 
복호화가 된다면 그 서버는 인증된 혹은 내가 목표로한 바로 그서버가 맞다는 의미이다. 
복호화가 된곳에는 `Server의 공개키` 와 `서버에 대한 정보`가 담겨 있다. 

# 3. [Client -> Server] Client Key Exchange
- PMS (Encrypted Pre-master secret)

Client에서 일종의 난수 값이 Pre-master secret(PMS)를 생성하고, 이를 Server의 Public Key로 암호화 함 

이 시점에서 클라이언트와 서버는 아래의 세값을 모두 가지고 있음 
- PMS
- Client 난수
- Server 난수 
위 세값을 통해 최종적으로 Encryption Key와 MAC Key를 각각 계산함
두개가 뭔지 정확하게 모르겠으나 어쨌든 최종 키 생성 완료
최종키는 Session key라고 한다. 

# 4. [Client <-> Server] Handshake Integrity Check
- 지금까지 했던 모든 통신내용을 정리해서 최종킹로 암호화 하여 서로 교환함 
- 그리고 모든 내용이 전에 통신했던 내용과 일치 한다면 이때부터 본격적으로 보안 통신을 통한 Data 교환을 시작.


# 참고
[https://opentutorials.org/course/228/4894]
[https://www.tuwlab.com/ece/26967]
[https://hanjungv.github.io/2017-11-07-1_CS_SSL/]
