# webpack 빌드시 도대체 comment 는 어떻게 처리 되는가!
```js

  optimization: {
      minimizer: [
        env.mode === 'production' && new TerserPlugin({
          extractComments: false,
          terserOptions: {
            compress:{
              drop_console: env.mode === 'production'
            },
            format:{
              // comments: false
            }
          }
        })
      ].filter(Boolean),
    },

  ```

## extractComments: false
- comment 내용을 LICENSE.txt 로 뽑을지 말지 하는거.
- 어떤 comment 가 뽑히는가? 그건 이 다음내용에 나옴

## format: {comments: 'some'} // Default 옵션
- comments 에 'false' 와 'some' 과, 'all', true ('all' 과 true 는 똑같음)가 있다. 
- false 로 하면 모든 코멘트를 무시하고 -> extractComments: false 옵션을 타서, -> 살아 남은 코멘트(지금은 없음)를 LICENSE.txt로 뽑지 않고, 코드 위에 그대로 둔다.
- 'some' (기본옵션) 으로 하면 -> /*! ~~ */ 형태의 라이센스 관련 주석(그냥 규칙이라고 함)만 살리고 -> 살아 남은 코멘트를 LICENSE.txt로 뽑지 않고, 코드 위에 그대로 둔다.
- 'all', true 로 하면 -> 모든 주석을 살리고 -> 살아 남은 코멘트를 LICENSE.txt로 뽑지 않고, 코드 위에 그대로 둔다.

# 아니 근데 나는 주석을 'some' 으로 했는데, 왜 크롬의 개발자 도구 source 탭에서 내 코드를 보면 모든 주석이 다보이는가?
- 그것은 webpack 의 source-map 때문이다. 
- terser 에서 drop_console 을 하면 실제 코드에서 console이 제거 되어 console이 안찌기지만, 소스 탭에서 코드보면 원본처럼 console 문구가 살아있는 것과 같은 이치이다. (디버그는 안걸리다. 실제 코드에는 없으니까)
- 마찬가지이다. 주석을 제거 했다고 하더라도, 실제 코드에서는 제거 되어 볼수 없지만, source-map 에는 남아 있으니까, 크롬 소스 탬에서 보면 주석이 보이는 것이다. 
- 결국, 내가 내 코드에서 주석을 진짜로 숨기려면, source-map 을 라이브로 올리면 안된다는 이야기.. ;;;
- 엉엉...