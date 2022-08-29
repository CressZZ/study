# 가끔 vscode 에서 prettier 모듈을 못찾는다고 할때가 있다. 

# https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
Failed to load module. If you have prettier or plugins referenced in package.json, ensure you have run npm install

When a package.json is present in your project and it contains prettier, plugins, or linter libraries this extension will attempt to load these modules from your node_module folder. If you see this error, it most likely means you need to run npm install or yarn install to install the packages in your package.json.

# 해석
vscode 프리티어 확장 프로그램은 해당 workspace의 package.json에 prettier 가 있으면
node_modules에서 prettier 를 사용하려고 하기 때문에
npm i 를 해야 한다. 
package.json 에 prettier 가 없으면 자체적인 prettier 를 사용하는듯 하다