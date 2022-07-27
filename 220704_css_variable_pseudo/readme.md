https://stackoverflow.com/questions/71462808/why-css-variables-are-not-inherited-in-pseudo-elements

# 개요
CSS 에서 변수를 사용할때, :after 와 같이 pseudo element 에는 적용이 안되는 것처럼 개발자 도구에 나오는 경우가 있다. 
`"not defined"` 로 나온다. 

사실 적용되고 있는데, 안된다고 나오는 크롬 버그.....................................

My bad, I actually had the same in my example. Actually I got confused because of the Chrome developer tool, which reports the variable as "not defined" (even in your example). I think this is a bug of Chrome inspector, which confused me thinking it was not working. I will report that to Blink developers ! – 
Michael Gallego
