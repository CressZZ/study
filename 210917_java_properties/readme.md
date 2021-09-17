# 이슈
java properties 파일에서 메시지를 치환하기 위한 무구가 있었는데, ${0} 이 제대로 동작 안해서 봤더니, ' (싱글쿼드) 가 있어서 저 ${0} 를 문구로 인식한 이슈 
cress's ${0} 이라고 하는순간 싱글쿼드 뒤에를 스트링으로 인식한다. 싱글쿼트 자체도 출력되지 않는다. 
해결 방법은 cress''s ${0} 으로 하면 해결!


# https://docs.oracle.com/javase/6/docs/api/java/text/MessageFormat.html
# https://stackoverflow.com/questions/4449639/apostrophe-doesnt-get-translated-properly-when-placed-in-a-resource-bundle