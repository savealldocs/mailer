export const schema={
  "type": "object",
  "properties": {
    "to": {
      "type": "array",
      "items": [
        {
          "type": "object",
          "properties": {
            "email": {
              "type": "string",
              "format": "email"
            },
            "name": {
              "type": "string"
            }
          },
          "required": ["email"]
        }
      ]
    },
    "cc": {
      "type": "array",
      "items": [
        {
          "type": "object",
          "properties": {
            "email": {
              "type": "string",
              "format": "email"
            },
            "name": {
              "type": "string"
            }
          },
          "required": ["email"]
        }
      ]
    },
    "bcc": {
      "type": "array",
      "items": [
        {
          "type": "object",
          "properties": {
            "email": {
              "type": "string",
              "format": "email"
            },
            "name": {
              "type": "string"
            }
          },
          "required": ["email"]
        }
      ]
    },
    "subject": {
      "type": "string"
    },
    "text": {
      "type": "string"
    }
  },
  "required": ["to", "cc", "bcc", "subject", "text"]
}
