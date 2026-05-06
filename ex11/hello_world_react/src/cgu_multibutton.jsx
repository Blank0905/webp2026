const styleArgument = { fontSize: '100px', color: 'red'};

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const changeText=(event)=>{
    console.log(event.target)
    event.target.innerText = event.target.innerText + "被點了"
}

const MultiButton = (num)=>{
    var output=[];
  output.push(
    <IconButton color="primary" aria-label="add to shopping cart"> 
    <AddShoppingCartIcon /></IconButton>)
    output.push(<IconButton color="primary" aria-label="Delete">
    <DeleteIcon /></IconButton>)
    output.push(<IconButton color="primary" aria-label="add an alarm">
    <AccessAlarmIcon /></IconButton>)
    return output;
}

export default MultiButton