import { TheNewYorkTimesProjectPage } from './app.po';

describe('the-new-york-times-project App', () => {
  let page: TheNewYorkTimesProjectPage;

  beforeEach(() => {
    page = new TheNewYorkTimesProjectPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
