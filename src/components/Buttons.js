import React from 'react';
import Button from './Button';

export default ({ onClick }) => (
  <div>
    <Button onClick={onClick} type="squareRoot" label="√" modifier="small"/>
    <Button onClick={onClick} type="off" label="OFF" modifier="small"/>

    <Button onClick={onClick} type="clearMemory" label="MC"/>
    <Button onClick={onClick} type="recallMemory" label="MR"/>
    <Button onClick={onClick} type="clearMemory" label="M-"/>
    <Button onClick={onClick} type="addToMemory" label="M+"/>
    <Button onClick={onClick} type="operator" value="/" label="÷"/>

    <Button onClick={onClick} type="percentage" value="%"/>
    <Button onClick={onClick} type="input" value="7"/>
    <Button onClick={onClick} type="input" value="8"/>
    <Button onClick={onClick} type="input" value="9"/>
    <Button onClick={onClick} type="operator" value="*" label="×"/>

    <Button onClick={onClick} type="plusNegative" label="±"/>
    <Button onClick={onClick} type="input" value="4"/>
    <Button onClick={onClick} type="input" value="5"/>
    <Button onClick={onClick} type="input" value="6"/>
    <Button onClick={onClick} type="operator" value="-"/>

    <Button onClick={onClick} type="clear" label="C" modifier="clear"/>
    <Button onClick={onClick} type="input" value="1"/>
    <Button onClick={onClick} type="input" value="2"/>
    <Button onClick={onClick} type="input" value="3"/>
    <Button onClick={onClick} type="operator" value="+" modifier="big"/>

    <Button onClick={onClick} type="clearAll" label="AC" modifier="clear"/>
    <Button onClick={onClick} type="input" value="0"/>
    <Button onClick={onClick} type="input" value="." label="·"/>
    <Button onClick={onClick} type="equal" label="="/>
  </div>
);
