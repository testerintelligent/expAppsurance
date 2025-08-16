// import logger from "./logger";

export function isValidEmail(email){
        if(typeof email!=="string" && email.length<8){
            return false;
        }
        if(email.includes("@gmail.com") || email.includes("@expleo.com")){
                return true;
         }
}

export function isValidPassword(password){
    if(typeof password!=="string" && password.length<8){
            return false;
        }
   return true;  
}


export function encode(text) {
  return Buffer.from(text, 'utf-8').toString('base64');
}

export function decode(text) {
  return Buffer.from(text, 'base64').toString('utf-8');
}

export function validatePasswordMatch(password,confirmPassword){
      if(password===confirmPassword){
        // logger.info("Password got matched");
        return true;
      }
      else{
        // logger.info("Password got mismatched")
        return false
      }

}