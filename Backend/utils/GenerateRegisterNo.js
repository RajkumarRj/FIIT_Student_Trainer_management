

export const generateRegisterNo = (no, branch)=>{
    const currentDate = new Date();
    const paddNumber = String(no).padStart(4,"0");
    return `FIIT-${branch}-${currentDate.getFullYear()}-R${paddNumber}`
}

