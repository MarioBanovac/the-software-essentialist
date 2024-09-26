MILITARY TIME VALIDATOR

FIND
// RESPONSIBILITIES

DOINGS
- validate a string against a strict rule 

KNOWINGS
- knows what a valid military time range looks like
- knows what isn't a valid military time range

// EXAMPLES
'00:00 - 23:59' --> valid // am + pm
'01:01 - 09:10' --> valid // am + am
'18:00 - 09:59' --> valid // pm + am
'13:13 - 16:16' --> valid // pm + pm
'25:00 - 01:00' --> invalid // first digit too large (00-23)
'23:60 - 13:00' --> invalid // second digit too large (00-59)
'10:45 - 27:15' --> invalid // third digit too large (00-23)
'12:00 - 19:61' --> invalid // fourth digit too large (00-59)

ARCHITECT

SYSTEMS THINKING (INPUT -> OUTPUT)

INPUT: IDEALLY A STRING IN THE FOLLOWING FORMAT /d/d:/d/d - /d/d:/d/d
OUTPUT: BOOLEAN -> TRUE | FALSE

PROGRAM BY WISHFUL THINKING
<!--

   interface IMilitaryTimeValidator{
    isValidRange(input: string): boolean
   }
   
   private methods:
   -checkStringFormat -- checks if the string is in the  /d/d:/d/d - /d/d:/d/d format
   -extractStartTime -- extracts the /d/d:/d/d first part and return as [startHour, startTinute]
   -extractEndTime -- extracts the /d/d:/d/d second part and return as [endHour, endMinute]
   -isValidHour(hour:string in format /d/d) -- checks if hour is 00-23
   -isValidMinute(minute:string in format /d/d) -- checks if minute is 00-59

   if everything passes return true else false

   let militaryTimeValidator = new MilitaryTimeValidator()
   militaryTimeValidator.isValidRange(string) 
 -->
 
 CLARIFY BEFORE YOU VERIFY
 - we will just test output with isTruthy or isFalsy 
 
 EXAMPLES:
 - expect(militaryTimeValidator.isValidRange(string)).toBeTruthy()
 - expect(militaryTimeValidator.isValidRange(string)).toBeFalsy()
 
