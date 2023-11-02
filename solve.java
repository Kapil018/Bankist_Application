import java.lang.reflect.Array;
import java.util.*;
public class solve{
    public static void main(String [] args){
       int a[]  = {1,2,3,6};
       int n = a.length;
       ArrayList<Integer> temp = new ArrayList<>();
       int i =0;
       solve1(i,a,n,temp);

    }
    public static void solve1(int i, int a[], int n,ArrayList<Integer> temp){
        if(i==n){
            System.out.println(temp);
            return;
        }
        temp.add(a[i]);
        solve1(i+1,a,n,temp);
        temp.remove(temp.size()-1);
        solve1(i+1,a,n,temp);
        return;
    }
    public static int checkGcd(ArrayList<Integer> temp){
        
        return 0;
    }
}