import styled from "styled-components";

const Widget = styled.div`
  margin: 24px 0;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background-color: #33658a;
  opacity: 0.9;
  border-radius: 4px;
  overflow: hidden;

  h1,
  h2,
  h3 {
    font-size: 1rem;
    line-height: 1rem;
    margin-bottom: 0;
  }

  p {
    font-size: 0.875rem;
    line-height: 1rem;
  }
`;

Widget.Content = styled.div`
  padding: 24px 32px 32px 32px;

  & > *:first-child {
    margin-top: 0;
  }
  & > *:last-child {
    margin-bottom: 0;
  }
  ul {
    list-style: none;
    padding: 0;
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.contrastText};
  }

`;

Widget.Header = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 18px 32px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text2};
`;

export default Widget;
