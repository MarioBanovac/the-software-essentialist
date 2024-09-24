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
