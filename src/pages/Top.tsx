function Top() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4">
        <h1 className="text-4xl font-bold text-blue-600">C</h1>
      </div>
      <h2 className="text-2xl font-bold mb-2">連絡先アプリへようこそ</h2>
      <p className="text-gray-600 max-w-md">
        このアプリでは、大切な連絡先を簡単に管理できます。
        左側のサイドバーから連絡先を選択するか、
        「+」ボタンをクリックして新しい連絡先を追加してください。
      </p>
    </div>
  );
}

export default Top;
