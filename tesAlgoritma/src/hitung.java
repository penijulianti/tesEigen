import java.util.HashMap;

public class hitung {
    //    NO 3 - hitung berapa kali kata dalam QUERY muncul di INPUT
    public static  int[] hitung(String[] input, String[] query){
        HashMap<String, Integer> hitungKata = new HashMap<>();
        for(String kata : input){
            hitungKata.put(kata, hitungKata.getOrDefault(kata, 0)+1);
        }
        int[] hasil = new int[query.length];
        for(int a = 0; a < query.length; a++){
            hasil[a] = hitungKata.getOrDefault(query[a],0);
        }
        return hasil;
    }
}
