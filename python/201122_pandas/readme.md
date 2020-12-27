# Pandas
- 구조화된 데이터를 효과적으로 처리하고 저장할수 있는 파이썬 라이브러리. 
- Array 꼐산에 특화된 numpy를 기반으로 만들어져서 다양한 기능들을 제공한다. 

# Series
- 특수한 딕셔너리. 
- numpy array가 보강된 형태 Data와 index 를 가지고 있다. 
```py
import pandas as pd

data = pd.Series([1,2,3,4])
print(data)

data = pd.Series([1,2,3,4], index=['a','b','c','d'])
data['b'] #2
```

## 딕셔너리를 기초로 Series 를 만들수 있다. 
```py
test = {
	'a':1,
	'b':2
}

test_se = pd.Series(test)
```

# DataFrame
- 여러개의 Series가 모여서 행과 열을 이룬 데이터
```py
import numpy as np
import pandas as pd

# 두 개의 시리즈 데이터가 있습니다.
print("Population series data:")
population_dict = {
    'korea': 5180,
    'japan': 12718,
    'china': 141500,
    'usa': 32676
}
population = pd.Series(population_dict)
print(population, "\n")

print("GDP series data:")
gdp_dict = {
    'korea': 169320000,
    'japan': 516700000,
    'china': 1409250000,
    'usa': 2041280000,
}
gdp = pd.Series(gdp_dict)
print(gdp, "\n")


# 이곳에서 2개의 시리즈 값이 들어간 데이터프레임을 생성합니다.
print("Country DataFrame")
country = pd.DataFrame({'population': population, "gdp":gdp})
print(country, "\n")

# 데이터 프레임에 gdp per capita 칼럼을 추가하고 출력합니다.
country['gdp per capita'] = country['gdp'] / country['population']
print(country, "\n")


# 데이터 프레임을 만들었다면, index와 column도 각각 확인해보세요.
print(country.index)
print(country.columns)

```

# Indexing / Slicing
## loc 
- 명시적인 인덱스를 참조하는 인덱싱/슬라이싱 (키값)
## iloc
- 파이썬 스타일 정수 인덱스 인덱싱 / 슬라이싱 (인덱스 숫자값)
```py
# 명시적 인덱싱을 사용하여 데이터프레임의 "china" 인덱스를 출력해봅시다.
print(country.loc["china"])

# 정수 인덱싱을 사용하여 데이터프레임의 1번째부터 3번째 인덱스를 출력해봅시다.
print(country.iloc[1:4])
```

# 누락된 데이터 체크
```py
dataframe.isnull()
dataframe.notnull()

dataframe.dropna()
dataframe['전화번호']=dataframe['전화번호'].fillna('전화번호 없음')

```

# Series 연산

# 정렬하기 
```py
df.sort_values('col1') # 오름차순
df.sort_values('col1', ascending=False) # 내림차순

df.sort_values(['col2', 'col1'])

```

```py
import numpy as np
import pandas as pd

print("DataFrame: ")
df = pd.DataFrame({
    'col1' : [2, 1, 9, 8, 7, 4],
    'col2' : ['A', 'A', 'B', np.nan, 'D', 'C'],
    'col3': [0, 1, 9, 4, 2, 3],
})
print(df, "\n")

# 정렬 코드 입력해보기    
# Q1. col1을 기준으로 오름차순으로 정렬하기.

sorted_df1 = df.sort_values('col1')
print()

# Q2. col2를 기준으로 내림차순으로 정렬하기.
sorted_df2 = df.sort_values('col2', ascending=False)
print()

# Q3. col2를 기준으로 오름차순으로, col1를 기준으로 내림차순으로 정렬하기.
sorted_df3 = df.sort_values(['col2', 'col1'], ascending=[True, False])
print()
```

```py
import pandas as pd

def main():
    tree_df = pd.read_csv('./data/tree_data.csv')
    # print(len(tree_df.dropna()))
    
    # print(tree_df.sort_values("height", ascending=False))
    tree_df = tree_df.sort_values("height", ascending=False)
    print(tree_df.iloc[:1])
    # print(tree_df.head(5))
    
    tree_df.to_csv("")
```




