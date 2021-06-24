# 1 태초에 NCSA 모자이크(NCSA Mosaic)가 있었다. 모자이크는 자신을 NCSA_Mosaic/2.0(Windows 3.1) 라고 불렀으며 텍스트와 그림을 함께 보여주었고, 보기에 좋았다.

# 2 그후 "모자이크 킬러"(Mosaic Killer)를 줄여서 만든 이름, 모질라(Mozilla)라고 하는 새로운 브라우저가 나타났다. 

# 3 모자이크는 이 이름을 좋아하지 않았고, 결국 모질라의 공식 이름은 넷츠케이프(Netscape)로 되었다. 넷츠케이프는 스스로를 Mozilla/1.0(Win3.1) 로 불렀고 보기에 좀 더 좋았다. 

# 4 넷츠케이프는 프레임(frames)을 지원해서 매우 인기가 있었지만 모자이크는 프레임을 지원하지 않았다. 그래서 웹마스터들은 브라우저 스니핑(user-agent sniffing) 를 통해 모질라 브라우저인 경우에는 프레임을 사용할 수 있도록 사이트를 만들었고 다른 브라우저인 경우에는 프레임을 사용하지 않도록 했다

# 5 넷츠케이프는 Microsoft사의 윈도우즈를 "버그투성이의 디바이스 드라이버" 라고 조롱했고 MS는 화가 났다. 그래서 MS는 "인터넷 익스플로러"(Internet Explorer)라고 하는 자신들의 웹 브라우저를 만들었다. "Netscape Killer' 가 되기를 바라며.. 

# 6 익스플로러는 프레임을 지원했으나 모질라와는 다르게 (웹마스터들이 그 사실을 잘 몰랐기 때문에), 정작 프레임이 사용된 페이지들이 보여지지는 않았다. 

# 7 MS는, IE가 프레임을 지원한다는 것을 사람들이 알게될때까지 기다리지 못하고, 넷츠케이프를 가장해 스스로를 모질라 호환 브라우저("Mozilla compatible") 라고 했다. 

# 8 그리고 Mozilla/1.22(compatible; MSIE 2.0; Windows 95) 라고 칭해서 프레임이 사용된 페이지들을 보여주기 시작했다. MS는 행복했으나, 웹마스터들은 혼란스러웠다

# 9 MS는 IE를 윈도우와 함께 팔았고 넷츠케이프보다 더 잘 만들었다. 그래서 첫번째 브라우저 전쟁이 전개되었고 결국 넷츠케이프가 졌다. MS는 좋아했다. 

# 11 하지만 넷츠케이프는 모질라로 다시 태어났고 게코(Gecko) 를 만들었다. 그리고 스스로를 Mozilla/5.0 (Windows; U; Windows NT 5.0; en-US; rv:1.1) Gecko/20020826 이라고 칭했다. 

# 12 게코는 렌더링 엔진이었으며 잘 동작했다. 모질라는 파이어폭스(Firefox) 가 되었으며 스스로를 Mozilla/5.0 (Windows; U; Windows NT 5.1; sv-SE; rv:1.7.5) Gecko/20041108 Firefox/1.0 라고 불렀고, 파이어폭스는 아주 잘 동작했다. 

# 13 게코는 퍼져나가기 시작햇다. 다른 브라우저들는 게코의 코드를 써서 다시 만들어 졌으며 그들중 어떤것은 Mozilla/5.0 (Macintosh; U; PPC Mac OS X Mach-O; en-US; rv:1.7.2) Gecko/20040825 Camino/0.8.1 라고 불렸고, 

# 14 또 다른것은 Mozilla/5.0 (Windows; U; Windows NT 5.1; de; rv:1.8.1.8) Gecko/20071008 SeaMonkey/1.0 라고 불렸다. 

# 15 각각 모질라인척 했고, 게코 엔진에 의해 동작했다

# 16 게코는 좋았고 IE는 좋지 못했다. 그래서 브라우저 스니핑이 다시 생겨났다. 게코는 좋은 코드로 짜여졌지만 다른것은 그러지 못했다. 

# 17Konqueror 브라우저를 쓰고있는 리눅스의 팬들은 더 슬펐다. Konqueror의 엔진은 KHTML이었고, KHTML엔진은 게코엔진 만큼 좋았지만, 게코엔진이 아니었다. 그래서 좋은 페이지들을 보여줄수 없었다. 그래서 Konquerer는 좋은 페이지들을 보여주기 위해 "게코와 비슷한"("like Gecko") 척을 했다. 

# 18 그리고 스스로를 Mozilla/5.0 (compatible; Konqueror/3.2; FreeBSD) (KHTML, like Gecko) 라고 했고 혼란은 더욱 많아졌다.

# 19 결정적으로 오페라(Opera)가 "우리는 우리의 사용자가 우리가 가장해야하는 브라우저를 결정할 수 있도록해야한다" 고 발표했다. 
# 그리고 메뉴를 만들어서 Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; en) Opera 9.51 와 
# Mozilla/5.0 (Windows NT 6.0; U; en; rv:1.8.1) Gecko/20061208 Firefox/2.0.0 Opera 9.51 
# 또는 Opera/9.51 (Windows NT 5.1; U; en) 중에 하나로 불릴수 있도록 유저들이 선택하게 했다

# 20 애플은 KHTML을 이용해서 사파리(Safari)를 만들었다. 그 과정에서 많은 기능들을 추가했고 프로젝트를 포크(fork) 했다. 

# 21 그것은 웹킷(Webkit) 엔진으로 불렸지만 KHTML엔진에 최적화된 페이지들을 받아보고 싶었다. 

# 22 그래서 사파리는 스스로를 Mozilla/5.0 (Macintosh; U; PPC Mac OS X; de-de) AppleWebKit/85.7 (KHTML, like Gecko) Safari/85.5 라고 불렀고 상황은 점점 더 안좋아졌다.

# 23 MS 는 파이어폭스가 매우 두려웠다. 그래서 IE는 스스로를 Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0)라 부르며 귀환했다. IE는 좋은 코드로 쓰여졌지만 오직 웹마스터가 잘 사용할 경우에만 잘 동작했다

# 24구글은 크롬을 만들었고 크롬은 웹킷을 사용했다. 크롬은 사파리와 비슷했고 사파리에 최적화된 페이지를 받아보기 원했으며 그래서 사파리인 척을 했다. 

# 25 결국 크롬은 웹킷을 사용했고 사파리인 척을 했으며 웹킷은 KHTML인 척을 했고 KHTML은 게코 흉내를 냈다. 모든 브라우저는 모질라인 척을 했고,

# 26 그래서 크롬은 스스로를 Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US) AppleWebKit/525.13 (KHTML, like Gecko) Chrome/0.2.149.27 Safari/525.13 라고 불렀다

# 27 그래서 user agent string 값은 아주 복잡하고 거의 쓸모가 없다. 모든 브라우저가 다른 브라우저인척 행세하고, 매우 혼란스럽다