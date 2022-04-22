
# 이슈
input 과 placeholder 의 폰트 사이즈를 다르게 하면 크롬에서 placeholder 의 텍스트가 input 의 텍스트 base-line 기준으로 정렬되어, 세로축 센터가 맞지 않는 현상이 생긴다. 

즉, placeholder 의 폰트 사이즈가 input 보다 작다면, placeholder의 텍스트가 input 창의 센터보다 조금 아래 배치 되는 것이다. 

이걸 해결하려고, 백마진 margin: -4px; 등을 주엇으나, 이러면 사파리에서 문제가 생긴다. 

애초에 사파리는 input 과 placehoder의 폰트 사이즈가 달라도, placeholder의 텍스트가 센터정렬이 잘되어 배치 되기 때문에 백마진으로 인해 폰트 배치가 올라가 버린다. 

이를 해결하기 위해 position absolute 로 top: 50%;  transform trnaslate 0, 50%; 을 활용했지만, 사파리에서는 placehoder에 absolute 적용이 안된는 것으로 보였다. 

그러던 중 https://stackoverflow.com/questions/47357063/vertically-align-an-input-placeholder-with-css-or-set-line-height 을 발견
맨 아래 코멘트를 참조하여, 그나마 괜찮은 방법을 발견 하였다.

```css
input {
    font-size: 20px;
}
input::-webkit-input-placeholder {
    transform: scale(0.75);
    transform-origin: 0% 50%;
    overflow: visible;
}
```