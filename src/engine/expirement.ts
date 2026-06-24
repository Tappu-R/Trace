interface chaiOrder  {
    number:number;
    name:string;
}

function chai(order:chaiOrder) {
    console.log(order)
}

const chai1:chaiOrder = {
    number:54,
    name:"tappu"
}
chai(chai1)