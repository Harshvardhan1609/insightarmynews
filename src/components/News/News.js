import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import NullImage from "../../components/Images/nullImage.png";
import Loading from "../Loading/Loading";
import NewsItem from "../NewsItem/NewsItem";
import { v4 as uuidv4 } from "uuid";
import { Col, Row } from "react-bootstrap";
import { header } from "../../config/config";
import { endpointPath } from "../../config/api";
import { Container, Header, card } from "./index";

function News(props) {
  const { newscategory, country } = props;
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const capitaLize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const truncateDescription = (description) => {
    if (!description) return ""; 
    const maxLength = 350; // Rough estimate for 5 to 6 lines
    if (description.length <= maxLength) return description;

    const truncated = description.slice(0, maxLength);
    const lastSentenceEnd = truncated.lastIndexOf(". ");
    return truncated.slice(0, lastSentenceEnd + 1); // Complete the sentence
  };

  const category = newscategory;
  const title = capitaLize(category);
  document.title = `${capitaLize(title)} - News`;

  const updatenews = async () => {
    try {
      const response = await axios.get(endpointPath(country, category));
      setLoading(true);
      const parsedData = response.data;
      setArticles(parsedData.articles);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    updatenews();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header>{header(capitaLize(category))}</Header>
          <Container>
            <Row>
              {articles.map((element) => {
                return (
                  <Col sm={12} md={6} lg={4} xl={3} style={card} key={uuidv4()}>
                    <NewsItem
                      title={element.title}
                      description={truncateDescription(element.description)}
                      published={element.publishedAt}
                      channel={element.source.name}
                      alt="News image"
                      publishedAt={element.publishedAt}
                      imageUrl={
                        element.image === null ? NullImage : element.image
                      }
                      urlNews={element.url}
                    />
                  </Col>
                );
              })}
            </Row>
          </Container>
        </>
      )}
    </>
  );
}

News.defaultProps = {
  country: "in",
  newscategory: "general",
};

News.propTypes = {
  country: PropTypes.string,
  newscategory: PropTypes.string,
};

export default News;
