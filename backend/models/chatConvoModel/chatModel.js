const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  text: {
    type: String,
  },
  priority: {
    type: Number,
  },
});

const locationSchema = new mongoose.Schema({
  url: {
    type: String,
  },
  priority: {
    type: Number,
  },
});

const weddingSchema = new mongoose.Schema(
  {
    order: {
      type: Number,
    },
    authId: {
      type: String,
    },
    chatId: {
      type: String,
    },
    chatTitle: {
      type: String,
    },
    
    photos: [
      {
        public_id: {
          type: String,
          required: false,
        },
        url: {
          type: String,
          required: false,
        },
        priority: {
          type: Number,
        },
      },
    ],
    videos: [
      {
        public_id: {
          type: String,
        },
        url: {
          type: String,
        },
        priority: {
          type: Number,
        },
      },
    ],
    messages: [{text: {
      type: String,
    },
    priority: {
      type: Number,
    },}],
    location: [{
      url: {
        type: String,
      },
      priority: {
        type: Number,
      },
    }],
    date: {
      type: String,
    },
    time: {
      type: String,
    },
    options: [
      {
        question: {
          type: String,
        },
        rows:[{
          answer: {
            type: String,
          },
          moveOn: {
            type: String,
          },
        }],
        order: {
          type: Number,
        },
        priority: {
          type: Number,
        },
        toSaveToDatabase: {
          type: Boolean,
        },
        databaseSaveUrl: {
          type: String,
        },
        databaseCallType: {
          type: String,
        },
        queryObject: {
          type: String,
        },
      },
    ],
    textInput: {
      order: {
        type: Number,
      },
      priority: {
        type: Number,
      },
      toSaveToDatabase: {
        type: Boolean,
      },
      databaseSaveUrl: {
        type: String,
      },
      databaseCallType: {
        type: String,
      },
      queryObject: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

const Wedding = mongoose.model("ChatbotModel", weddingSchema);

module.exports = Wedding;
