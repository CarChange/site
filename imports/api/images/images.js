export const Images = new FS.Collection("images", {
  stores: [new FS.Store.FileSystem("images", {path: "~/uploads"})]
});

Images.allow({
  'insert': function () {
    // add custom authentication code here
    return true;
  },
  'update': function () {
    return true;
  },
  'remove': function(){
    return false;
  },
  //NÃO COMENTE O DOWNLOAD senão ele deleta todas as imagens
  'download': function(){
    return true;
  }
});
