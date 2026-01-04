import styled from "styled-components";

interface Props {
    children: React.ReactNode;
}

export default function Ball({children}:Props){
    return <Sld>{children}</Sld>;
}

const Sld = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  height: 50px;
  width: 50px;
  border-radius: 25px;
  color: #fff;
  background-color: #209869;
`;