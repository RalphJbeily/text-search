import React, { useEffect, useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import Highlighter from 'react-highlight-words';

import SearchBar from '../../components/search-bar';
import { articles } from '../../config/articles';
import { SEARCH } from '../../config/strings';

import {
  ArticleContainer,
  ArticlePublishDate,
  ArticleText,
  ArticleTitle,
  ArticlesContainer,
  InformationSection,
  InformationText,
  MainContainer,
  PageTitle,
  PostCounter,
  SearchContainer,
  TopContainer,
} from './styles';

const Home = () => {
  const [keyword, setKeyword] = useState('');

  const [articlesFound, setArticlesFound] = useState([]);

  useEffect(() => {
    if (!isEmpty(keyword)) {
      const matchedArticles = articles.map((article) => {
        if (article.title.includes(keyword) || article.text.includes(keyword)) {
          return article;
        }
        return {};
      });

      const filteredMatches = matchedArticles.filter(
        (value) => Object.keys(value).length !== 0,
      );

      setArticlesFound(filteredMatches);
    } else {
      setArticlesFound([]);
    }
  }, [keyword]);

  return (
    <MainContainer>
      <TopContainer>
        <SearchContainer>
          <PageTitle>{SEARCH}</PageTitle>
          <SearchBar setKeyword={setKeyword} />
          {!isEmpty(keyword) && (
            <>
              <PostCounter>
                <b>{`${articlesFound.length} posts `}</b>
                were found.
              </PostCounter>
            </>
          )}
        </SearchContainer>
        <InformationSection>
          <InformationText>
            <b>bitsofcode.</b> Articles on Frontend Development. All articles
            are written by <u>Ire Aderinokun,</u> Frontend Developer and User
            Interface Designer.
          </InformationText>
        </InformationSection>
      </TopContainer>
      <ArticlesContainer>
        {!isEmpty(articlesFound) &&
          articlesFound.map((articleFound) => {
            return (
              <ArticleContainer>
                <ArticleTitle>
                  <Highlighter
                    highlightClassName="title"
                    searchWords={[keyword]}
                    autoEscape={true}
                    textToHighlight={articleFound.title}
                  />
                </ArticleTitle>
                <ArticlePublishDate>
                  {articleFound.publishDate}
                </ArticlePublishDate>
                <ArticleText>
                  <Highlighter
                    highlightClassName="text"
                    searchWords={[keyword]}
                    autoEscape={true}
                    textToHighlight={articleFound.text}
                  />
                </ArticleText>
              </ArticleContainer>
            );
          })}
      </ArticlesContainer>
    </MainContainer>
  );
};

export default Home;
