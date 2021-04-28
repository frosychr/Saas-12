const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    keywords:{
        type: [String],
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    text:{
        type: String,
        required: true
    },
    name:{
        type: String
    },
    Answers: [
        {
            user:{
                type: Schema.Types.ObjectId,
                ref: 'users'
            },
            text:
                {
                  type:  String,
                    required: true
                },
                date:{
                    type: Date,
                    default: Date.now
                }
        }
    ],

    date:{
        type: Date,
        default: Date.now
    }

})
module.exports = Question = mongoose.model('question',QuestionSchema);