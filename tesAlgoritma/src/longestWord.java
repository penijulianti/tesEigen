public class longestWord {
    //    NO 2
    public static String longestWord(String kalimat){
        String[] words = kalimat.split(" ");
        String longestWord = " ";

        for (String word : words){
            if(word.length() > longestWord.length()){
                longestWord = word;
            }
        }
        return longestWord + ": " + longestWord.length() + " character";
    }
}
