# MetaMask는
- MetaMask는 사용자가 에서 방문한 웹사이트에 글로벌 API를 주입합니다 window.ethereum. 
- 이 API를 사용하면 웹사이트에서 `사용자의 이더리움 계정을 요청`하고 사`용자가 연결된 블록체인에서 데이터를 읽고` `사용자가 메시지 및 트랜잭션에 서명하도록 제안할 수 있습니다. `
- 공급자 개체의 존재는 이더리움 사용자를 나타냅니다. 
- We recommend using @metamask/detect-provider (opens new window)to detect our provider, on any platform or browser.



# geth/parity
## gath
- Geth는 이더리움 재단(Ethereum Foundation)이 제공하는 공식 클라이언트 소프트웨어로써, Go언어로 개발되었다.
## parity
- 패리티(Parity)는 이더리움 프로토콜의 또 다른 구현체이며, 러스트(Rust) 프로그래밍 언어로 개발되었다. 현재 Parity Inc. 라는 기업에서 운영하고 있다.

# geth
- 두 가지 방법으로 Geth와 상호 작용할 수 있습니다. IPC를 통해 JavaScript 콘솔을 사용하여 노드와 직접 상호 작용하거나 RPC를 사용하여 HTTP를 통해 원격으로 노드에 연결합니다.
- IPC를 사용하면 특히 계정 생성 및 상호 작용과 관련하여 더 많은 작업을 수행할 수 있지만 노드에 직접 액세스해야 합니다.
- RPC를 사용하면 원격 응용 프로그램이 노드에 액세스할 수 있지만 제한 사항과 보안 고려 사항이 있으며 기본적으로 eth 및 shh 네임스페이스의 메서드에만 액세스할 수 있습니다. RPC 문서에서 이 설정을 재정의하는 방법을 알아보세요.

## IPC/RPC
### IPC
IPC : 본인의 컴퓨터로 자신의 서버를 제어하는 경우(=우리의 경우, 자신의 서버를 내 컴퓨터에 만들어서 그것을 제어하기) Inter-process Communications generally works on your local computers 
### RPC
RPC : 외부의 서버컴퓨터에 접속해 제어하는 경우 Remote Procedure Calls generally works across different computers

If you need to run JSON-RPC, you'll also need TCP port 8545. Note that JSON-RPC port should not be opened to the outside world, because from there you can do admin operations.
메타마스크의 환경 등에선 포트를 8545 잡아야만 한다(JSON)
$ geth --identity "PrivateNetwork" --datadir "/Users/bernard/Documents/0414" --port "30303" --rpc --rpcaddr 0.0.0.0 --rpcport "8545" --rpccorsdomain "*" --nodiscover --networkid 1900 --nat "any" --rpcapi "db,eth,net,web3,miner,personal" console


* 컴팩트하게 다음과 같이 나타낼 수 있음(데이타 디렉토리까지 추가해도 여전히 컴팩트하다)
$ geth --rpcapi "web3,eth,personal" --nodiscover --rpc --rpcport "8545" console


# 흐름
엔드 유저(소비자) -> provider(JavaScript 객체) ->(RPC API를 통하여) -> `지갑` -> client(endpoint) -> 이더리움

# Ethereum Provider JavaScript API 


# Ethereum Provider JavaScript API  (공급자)
- 사용할 수 있는 JavaScript 객체입니다. 이것은 클라이언트의 수단에 의해 이더리움에 접근 하게 됩니다.
- cpp-ethereum,go-ethereum, and parity provide JSON-RPC communication over http and IPC
-  Web3 공급자는 이더리움 네트워크와 통신하는 geth 또는 패리티 노드를 실행하는 `웹사이트`입니다.
- At the time of writing, the following projects have working implementations:
- 
```
buidler.dev
ethers.js
eth-provider
MetaMask
WalletConnect
web3.js
```

# Client 고객
- Provider로부터 원격 프로시저 호출(RPC)요청을 수신하고 결과를 반환하는 endpoint입니다.

# 지갑 
개인 키를 관리하고 서명 작업을 수행하며 Provider와 Client 사이의 미들웨어 역할을 하는 end-user가 사용하는 응용 프로그램입니다. `내가 했다.`


# 원격 프로시저 호출(RPC)
- RPC(원격 프로시저 호출)는 Provider(공급자), 해당 지갑 또는 Client가 처리해야 하는 일부 절차에 대해 Provider(공급자)에게 제출된 모든 요청입니다.
- 

# json RPC API
- JavaScript 애플리케이션 내부에서 이더리움 노드와 통신하려면 web3.js 라이브러리를 사용하십시오. 이 라이브러리는 RPC 메소드에 대한 편리한 인터페이스를 제공합니다.
- 
# EIP-1193 (Ethereum Improvement Proposals)
- The Ethereum JavaScript provider API
- 공급자는 이 섹션에 정의된 API를 구현하고 노출해야 합니다(MUST). 모든 API 엔티티는 이 섹션에 정의된 유형 및 인터페이스를 준수해야 합니다(MUST).
```js
// request

// metaMask 에서 구현된
interface RequestArguments {
  method: string;
  params?: unknown[] | object;
}

ethereum.request(args: RequestArguments): Promise<unknown>;

```

# EIP-2255: Wallet Permissions System


# RPC

# Provider

# 

# web3js / web3j

# truffle








