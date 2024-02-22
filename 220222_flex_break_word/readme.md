https://stackoverflow.com/questions/36247140/why-dont-flex-items-shrink-past-content-size/36247448#36247448

https://stackoverflow.com/questions/40407619/min-width-rendering-differently-in-flex-direction-row-and-flex-direction-colum

 

flex item의 경우 아래가 디폴트 인데 (overflow: visible 인경우, overflow:hidden 이면 0으로 된다 )

min-width: auto
min-height: auto

 

아래와 같이 오버라이드 해줘야 함

min-width: 0;
min-height: 0;

 

The min-width: auto and min-height: auto defaults apply only when overflow is visible.
If the overflow value is not visible, the value of the min-size property is 0.
Hence, overflow: hidden can be a substitute for min-width: 0 and min-height: 0.
 