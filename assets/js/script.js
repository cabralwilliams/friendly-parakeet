// Assignment code here
//Create and fill the character arrays
var lowerLetters = [];
var upperLetters = [];
var specialCharacters = [];
for(var i = 0; i < 26; i++) {
  lowerLetters.push(String.fromCharCode(i + 97));
  upperLetters.push(String.fromCharCode(i + 65));
}

//Leave out the non-"special characters" characters
for(i = 33; i < 127; i++) {
  if((i > 47 && i < 58) || (i > 64 && i < 91) || (i > 96 && i < 123)) {
    continue;
  } else {
    specialCharacters.push(String.fromCharCode(i));
  }
}

//Randomizes the indexing of an array
var randomizer = function(inputInt = 50) {
  var output = [Math.floor(Math.random()*inputInt)];
  while(output.length < inputInt) {
    var count = 0;
    var testInt = Math.floor(Math.random()*inputInt);
    for(var j = 0; j < output.length; j++) {
      if(testInt == output[j]) {
        count++;
        break;
      }
    }
    if(count == 0) {
      output.push(testInt);
    }
  }
  return output;
};

function generatePassword() {
  var passwordLength = window.prompt("What is your desired password length?  (Minimum 8 characters, maximum 128 characters)");
  while(typeof parseInt(passwordLength) !== "number" || parseInt(passwordLength) < 8 || parseInt(passwordLength) > 128) {
    passwordLength = window.prompt("Incorrect input.  Your password length must be an integer between 8 and 128 characters in length.  Choose a length between 8 and 128 characters.");
  }
  var includeLower = window.confirm("Is at least one lowercase letter required?");
  var includeUpper = window.confirm("Is at least one uppercase letter required?");
  var includeNumber = window.confirm("Is at least one numeric character required?");
  var includeSpecial = window.confirm("Is at least one special character required?");
  while(!includeLower && !includeUpper && !includeNumber && !includeSpecial) {
    //If no to everything, ask again
    window.alert("Your password must contain at least one of these types of characters!");
    includeLower = window.confirm("Is at least one lowercase letter required?");
    includeUpper = window.confirm("Is at least one uppercase letter required?");
    includeNumber = window.confirm("Is at least one numeric character required?");
    includeSpecial = window.confirm("Is at least one special character required?");
  }
  
  //Create boolVals array to determine whether a character type is to be added
  var boolVals = [includeLower,includeUpper,includeNumber,includeSpecial];
  //Initialize array to contain the characters and then fill with at least one of each required character type
  var outCharacters = [];
  if(includeLower) {
    outCharacters.push(lowerLetters[Math.floor(Math.random()*26)]);
  }
  if(includeUpper) {
    outCharacters.push(upperLetters[Math.floor(Math.random()*26)]);
  }
  if(includeNumber) {
    outCharacters.push(Math.floor(Math.random()*10));
  }
  if(includeSpecial) {
    outCharacters.push(specialCharacters[Math.floor(Math.random()*specialCharacters.length)]);
  }
  while(outCharacters.length < parseInt(passwordLength)) {
    var index = Math.floor(Math.random()*4); //Randomly determine which type of character to include
    console.log(`${index}: ${boolVals[index]}`);
    var char;
    if(boolVals[index]) {
      switch(index) {
        case 0:
          char = lowerLetters[Math.floor(Math.random()*26)];
          break;
        case 1:
          char = upperLetters[Math.floor(Math.random()*26)];
          break;
        case 2:
          char = Math.floor(Math.random()*10);
          break;
        case 3:
          char = specialCharacters[Math.floor(Math.random()*specialCharacters.length)];
          break;
        default:
          char = lowerLetters[Math.floor(Math.random()*26)];
          break;
      }
      outCharacters.push(char);
    }
  }
  //Initialize the output string password and the randomize integer array
  var output = "";
  var intOrder = randomizer(parseInt(passwordLength));
  for(var k = 0; k < outCharacters.length; k++) {
    output += outCharacters[intOrder[k]];
  }
  return output;
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
  window.alert("Here is your password: " + password);
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
