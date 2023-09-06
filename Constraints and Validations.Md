## 'self, key we want to validate, value of what should be validated
def validate_email(self, key, address):
  if '@' not in address:
    raise ValueError("failed simple email validation")
      return address



  ## examples 
  @validates('title')
    def validate_title(self, key, title):
        clickbait = ["Won't Believe", "Secret", "Top", "Guess"]
        if not any(substring in title for substring in clickbait):
            raise ValueError("No clickbait found")
        return title

    @validates('content', 'summary')
    def validate_length(self, key, string):
        if( key == 'content'):
            if len(string) <= 250:
                raise ValueError("Post content must be greater than or equal 250 characters long.")
        if( key == 'summary'):
            if len(string) >= 250:
                raise ValueError("Post summary must be less than or equal to 250 characters long.")
        return string

    @validates('category')
    def validate_category(self, key, category):
        if category != 'Fiction' and category != 'Non-Fiction':
            raise ValueError("Category must be Fiction or Non-Fiction.")
        return category