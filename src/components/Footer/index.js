import styled from "styled-components";

const FooterWrapper = styled.footer`
  background-color: #bc4749;
  padding: 20px;
  display: flex;
  align-items: center;
  border-radius: 4px;
  opacity: 0.8;
  width: 350px;
  margin: 0 138px;
  height: 55px;
  img {
    width: 58px;
    margin-right: 21px;
  }

  a {
    color: white;
    text-decoration: none;
    transition: 0.3s;
    &:hover,
    &:focus {
      opacity: 0.5s;
    }
    span {
      text-decoration: underline;
    }
  }

  p {
    font-size: 13.5px;
    text-align: center;
  }


@media (max-width: 600px){
  margin: 0 auto;
  width: 321px;
  height: 75px;
}
`;

export default function Footer(props) {
  return (
    <FooterWrapper {...props}>
      <a href="https://www.alura.com.br/" target="_blank" rel="noreferrer">
        <img
          src="https://www.alura.com.br/assets/img/alura-logo-white.1570550707.svg"
          alt="Logo Alura"
        />
      </a>
      <p>
        Orgulhosamente criado durante a
        <a href="https://www.alura.com.br/" target="_blank" rel="noreferrer">
          <span> Imersão React da Alura</span>
        </a>
      </p>
    </FooterWrapper>
  );
}
